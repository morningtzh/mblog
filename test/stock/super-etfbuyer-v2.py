#!/usr/bin/python
# -*- coding: utf-8 -*- 
##############################
#Filename: Super-etfbuyer-v1.py
#Author:   Arnold Huang
#Email:    fugaohx@163.com
#Date:     2018.2.7
#Data file download path: https://rdl.oss-cn-hongkong.aliyuncs.com/dl/history.csv
#History:   2018.2.7  Initial Draft
#           2018.2.14 Initial Release V1.0
#           2018.3.11 V2.0 增加分红信息分析和复权净值处理
##############################


import csv
import time
import datetime
import re
import requests
import json
import random
import sys
import imp
import os
import tushare as ts 

bs_database=[]
fundCode_list=[]
imp.reload(sys)

def read_csv_data(filename="history.csv"):

    os.system("wget https://raw.githubusercontent.com/roowe/lwn/master/history.csv")

    with open(filename) as f:
        reader = csv.reader(f)
        keys = next(reader)
        for values in reader:
            record = dict(list(zip(keys,values )))
            bs_database.append(record)        
            fundCode= record["fundCode"]
            if fundCode not in fundCode_list:
                fundCode_list.append(fundCode)
    # #fundCode_list.remove("100032")
    # fundCode_list.remove("003376")
    # fundCode_list.remove("001061")
    # fundCode_list.remove("270048")
    # fundCode_list.remove("050027")
    # fundCode_list.remove("000216")
    # fundCode_list.remove("501018")
    # fundCode_list.remove("000614")
    # fundCode_list.remove("000071")
    # fundCode_list.remove("162411")
    # fundCode_list.remove("160416")

def cal_time(date1,date2):
    date1 = time.strptime(date1,"%Y-%m-%d")
    date2 = time.strptime(date2,"%Y-%m-%d")
    date1 = datetime.datetime(*date1[:3])
    date2 = datetime.datetime(*date2[:3])
    return (date2-date1).days

def get_fhsp_data(fundCode, startdate):
    headers_data = {
         "Host" : "fund.eastmoney.com",
         "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:58.0) Gecko/20100101 Firefox/58.0",
         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
         "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
         "Accept-Encoding": "gzip, deflate",
         "Connection": "keep-alive",
         "Upgrade-Insecure-Requests": "1",
         "Cache-Control":"max-age=0",
    }

    url = "http://fund.eastmoney.com/f10/fhsp_"+fundCode+".html"
    return_data = requests.get(url, headers = headers_data)
    fhsp_pattern = re.compile("<td>(\d{4}-\d{2}-\d{2})</td><td>每份派现金(\d*\.\d{4})元</td>")
    tmp = fhsp_pattern.findall(return_data.text)

    retval=[]
    for i in range(0, len(tmp)):

        if startdate != tmp[i][0]:
            retval.append(tmp[i])
    
    retval.reverse()
    return retval

def get_fund_today_price(fundCode, retry=10):
    headers_data = {
            "Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q",
            "Accept-Encoding" : "gzip, deflate",
            "Accept-Language" : "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
            "Cache-Control" : "max-age=0",
            "Connection" : "Keep-alive",
            "Host" : "fundgz.1234567.com.cn",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:58.0) Gecko/20100101 Firefox/58.0"
            }
    for retry_times in range(0, retry+1):
        try:
            random_value = random.sample(["0", "1", "2","3","4","5","6","7","8","9"],1)
            current_time = str(time.time()).replace('.','') + random_value[0]
            url = "http://fundgz.1234567.com.cn/js/%s.js?rt=%s" % (fundCode, current_time)
            return_data  = requests.get( url, headers= headers_data)
            raw_data     = re.findall("jsonpgz\((.*)\)", return_data.text)
            if len(raw_data) != 0 :
                break
            else:
                continue
        except:
            if retry_times < retry:
                time.sleep(1)
                continue
            else:
                print("Network error!")
                sys.exit()
    data = json.loads(raw_data[0])
    fundName = data["name"]
    currentPrice = data["gsz"]
    return fundName, currentPrice 

def get_nav_rate(buyrecord, fhsp_data, history_data):
    buy_date = buyrecord["navDate"]
    nav_rate = 1;

    for fhsp in fhsp_data:
        fhsp_date = fhsp[0]
        fhsp_money = float(fhsp[1])

        if cal_time(buy_date ,fhsp_date) > 0:
            #如果在购买日期之后找到分红信息，形成阶段性涨幅
            #寻找分红之日的净值信息
            history_value = float(history_data[fhsp_date].value)
            
            #阶段性涨幅相乘即复权率
            rate_in_this_phase =  (history_value + fhsp_money )/ history_value
            nav_rate = nav_rate * rate_in_this_phase

    return float("%.4f" % nav_rate)

def analyze_fund(fundCode):
    buy_records = []
    sell_records = []
    suggest_records = []
    buy_count = 0
    sell_count = 0
    buyOrderCode = "022"
    sellOrderCode = "024"
    print("Analyzing %s... " % fundCode)
    #Grep target fundcode
    for bs_record in bs_database:
        if (bs_record["fundCode"] == fundCode and bs_record["orderCode"] == buyOrderCode):
            cnt = bs_record["tradeUnit"]
            buy_count = buy_count + int(cnt)
            if (cnt == "1"):
                buy_records.append(bs_record)
            else:
                bs_record["tradeUnit"] = "1"
                for i in range(0, int(cnt)):
                    buy_records.append(bs_record)
             
    for bs_record in bs_database:
        if (bs_record["fundCode"] == fundCode and bs_record["orderCode"] == sellOrderCode):
            cnt = bs_record["tradeUnit"]
            sell_count = sell_count + int(cnt)

    buy_records.sort(key=lambda x:(x['navDate']))
	
    start_date = buy_records[0]['navDate']
    start_datetime = start_date + " 15:00:00"
    # history_data = get_history_data(fundCode, start_datetime)

    fhsp_data = get_fhsp_data(fundCode, start_datetime)

    history_data = ts.fund.nav.get_nav_history(fundCode,start=start_date)

	
    buy_records.sort(key=lambda x:(x['nav']))
    sell_records.sort(key=lambda x:(x['nav']))

    fundname = ts.fund.nav.get_fund_info(fundCode).jjjc[0]

    def get_curr_price(date):

        valueSeries = history_data[str(date)].value

        if len(valueSeries) == 0:
            return get_curr_price(date - datetime.timedelta(days=1))

        return valueSeries[0]


    current_price = get_curr_price(datetime.date.today())

    # fundname, current_price = get_fund_today_price(fundCode)


 
    for i in range(0, sell_count):
        buy_records.pop()
    
    suggest_cnt = 0
    nav_records = []

    #####处理复权净值##################
  	
    for record in buy_records:
        nav_rate = get_nav_rate(record, fhsp_data, history_data)
        nav_record = {}
        nav_record["nav"] = float( "%.4f" % (float(record["nav"]) / nav_rate)) 
        nav_record["navDate"] = record["navDate"]
        nav_records.append(nav_record)

    for record in nav_records:
        if float(record["nav"]) > float(current_price):
            suggest_records.append(record)
            suggest_cnt = suggest_cnt +  1

    return fundname , current_price, suggest_cnt, suggest_records    

def analyze_all_funds():
    suggestion1=""
    suggestion2=""
    print("严正声明!")
    print("本程序是用于长赢计划中国A股部分的基于空仓状态下的补仓建议。您实际需要补仓的份数=空仓补仓份数-当前持仓份数")
    print("此外，为了尽量获得准确的每日结算估值，请参考本程序在北京时间14：30到14:50之间的运行结果！如果需要补仓，给自己留足够的时间到交易软件购买基金。")
    print("本程序的输出内容不构成任何的投资指导，股市有风险，入市需谨慎！风险自担！")
    print("由此造成的补仓成本过高，本程序作者和网站负责人不承担任何责任！")

    
    for fundCode in fundCode_list:
        fundname , current_price, suggest_cnt, suggest_records = analyze_fund(fundCode)
        if suggest_cnt == 0:
            suggestion1 += "(%s) %s 不建议补仓\n" % (fundCode, fundname)
        else:
            suggestion2 += "(%s) %s 基于空仓补仓%d份 当前价格 %s\n" % (fundCode, fundname, suggest_cnt, current_price) 
            for item in suggest_records:
                suggestion2 += "\t历史购买日期%s: 复权净值: %s\n" % (item["navDate"], item["nav"]) 
            suggestion2 += "=================================\n"

    print(suggestion1)
    print(suggestion2)
    print("严正声明!")
    print("本程序是用于长赢计划中国A股部分的基于空仓状态下的补仓建议。您实际需要补仓的份数=空仓补仓份数-当前持仓份数")
    print("此外，为了尽量获得准确的每日结算估值，请参考本程序在北京时间14：30到14:50之间的运行结果！如果需要补仓，给自己留足够的时间到交易软件购买基金。")
    print("本程序的输出内容不构成任何的投资指导，股市有风险，入市需谨慎！风险自担！")
    print("由此造成的补仓成本过高，本程序作者和网站负责人不承担任何责任！")


read_csv_data()
analyze_all_funds()

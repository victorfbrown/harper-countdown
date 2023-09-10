import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json
import time

scope = ['https://www.googleapis.com/auth/spreadsheets',
         "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name(
    '../../credentials/client_secret_uchicago.json', scope)
client = gspread.authorize(creds)

sheet = client.open('test spreadsheet').worksheet("Sheet1")
#sheet = client.open('Harper Countdown').worksheet('Fall Quarter')

individual_tips_start = 20
individual_revenue_start = 31
tips_object_col = 5
revenue_object_col = 6


def object_to_array(object):
    pullArrayKeys = [
        "pullHundred",
        "pullFifty",
        "pullTwenty",
        "pullTen",
        "pullFive",
        "pullTwo",
        "pullOne",
        "pullQuarters",
        "pullDimes",
        "pullNickels",
        "pullPennies"]
    return [object[key] for key in pullArrayKeys]


def populate_row(sheet, tips_array, revenue_array, row, individual_tips_start=individual_tips_start, individual_revenue_start=individual_revenue_start):
    if set(tips_array) == {""}:
        print(f'\nClearing Row {row}')
    else:
        print(f'\nUpdating Row {row}')
    
    for i, (tip_value, revenue_value) in enumerate(zip(tips_array, revenue_array)):
        sheet.update_cell(row, individual_tips_start+i, tip_value)
        sheet.update_cell(row, individual_revenue_start+i, revenue_value)
        sleep_time = 1.75
        time.sleep(sleep_time)
    
    if set(tips_array) == {""}:
        print(f'Finished Clearing Row {row}')
    else:
        print(f'Finished Updating Row {row}')


def clear_row(sheet, row, individual_tips_start=individual_tips_start, individual_revenue_start=individual_revenue_start):
    populate_row(sheet=sheet, tips_array=[""]*11, revenue_array=[""]*11, row=row, individual_tips_start=individual_tips_start, individual_revenue_start=individual_revenue_start)


def populate_spreadsheet(sheet, row, tips_object_col=tips_object_col, revenue_object_col=revenue_object_col):
    calls = 0
    while sheet.cell(row, 1).value is not None:
        calls += 1
        tips_object = json.loads(sheet.cell(row, tips_object_col).value)[
            'tips']
        revenue_object = json.loads(sheet.cell(row, revenue_object_col).value)[
            'revenue']

        tips_array, revenue_array = object_to_array(
            tips_object), object_to_array(revenue_object)
        
        populate_row(sheet=sheet, tips_array=tips_array, revenue_array=revenue_array, row=row, individual_tips_start=individual_tips_start, individual_revenue_start=individual_revenue_start)
        row += 1


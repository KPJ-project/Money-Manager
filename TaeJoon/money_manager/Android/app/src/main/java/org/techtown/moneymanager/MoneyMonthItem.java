package org.techtown.moneymanager;

public class MoneyMonthItem {

    String id;
    String month;
    int price_income;
    int price_expense;
    boolean income;

    public MoneyMonthItem(String month,  int price_income, int price_expense, boolean income){
        this.month = month;
        this.price_income = price_income;
        this.price_expense = price_expense;
        this.income = income;
    }

    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id = id;
    }

    public String getMonth(){
        return month;
    }
    public void setMonth(String month){
        this.month = month;
    }

    public int getPrice_income(){ return price_income; }
    public void setPrice_income(int price_income){ this.price_income = price_income; }

    public int getPrice_expense(){ return price_expense; }
    public void setPrice_expense(int price_expense){
        this.price_expense = price_expense;
    }

    public boolean getIncome(){ return income; }
    public void setIncome(boolean income){ this.income = income; }

}

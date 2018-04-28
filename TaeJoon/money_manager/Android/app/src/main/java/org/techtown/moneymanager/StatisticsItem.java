package org.techtown.moneymanager;

public class StatisticsItem {

    String id;
    int percent;
    String category;
    int balance;

    public StatisticsItem(int percent, String category, int balance){
        this.percent = percent;
        this.category = category;
        this.balance = balance;
    }

    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id = id;
    }

    public int getPercent(){ return percent; }
    public void setPercent(int percent){ this.percent = percent; }

    public String getCategory(){ return category; }
    public void setCategory(String category){ this.category = category; }

    public int getBalance(){ return balance; }
    public void setBalance(int balance){ this.balance = balance; }

}

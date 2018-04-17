package org.techtown.moneymanager;

public class MoneyItem {

    String id;
    String dates;
    String category;
    String contents;
    int price;

    public MoneyItem(String id, String dates, String category, String contents, int price){
        this.id = id;
        this.dates = dates;
        this.category = category;
        this.contents = contents;
        this.price = price;
    }
    public String getId(){
        return id;
    }
    public void setId(String id){
        this.id = id;
    }

    public int getPrice(){
        return price;
    }

    public void setPrice(int price){
        this.price = price;
    }

    public String getContents(){
        return contents;
    }

    public void setContents(String contents){
        this.contents = contents;
    }

    public String getCategory(){
        return category;
    }

    public void setCategory(String category){
        this.category = category;
    }

    public String getDates(){
        return dates;
    }

    public void setDates(String dates){
        this.dates = dates;
    }


}

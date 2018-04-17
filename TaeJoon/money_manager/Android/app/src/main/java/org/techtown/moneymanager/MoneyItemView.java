package org.techtown.moneymanager;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.LinearLayout;
import android.widget.TextView;

public class MoneyItemView extends LinearLayout {

    TextView tv_id;
    TextView tv_dates;
    TextView tv_category;
    TextView tv_contents;
    TextView tv_price;

    public MoneyItemView(Context context) {
        super(context);
        init(context);
    }

    public MoneyItemView(Context context, AttributeSet attrs){
        super(context, attrs);
        init(context);
    }

    private void init(Context context) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        inflater.inflate(R.layout.money_item, this, true);

        tv_id = (TextView) findViewById(R.id.tv_id);
        tv_dates = (TextView) findViewById(R.id.tv_dates);
        tv_category = (TextView) findViewById(R.id.tv_category);
        tv_contents = (TextView) findViewById(R.id.tv_contents);
        tv_price = (TextView) findViewById(R.id.tv_price);
    }

    public void setId(String id){
        tv_id.setText(id);
    }

    public void setDates(String dates){
        tv_dates.setText(dates);
    }

    public void setCategory(String category){
        tv_category.setText(category);
    }

    public void setContents(String contents){
        tv_contents.setText(contents);
    }

    public void setPrice(int price){
        tv_price.setText(String.valueOf(price));
    }
}

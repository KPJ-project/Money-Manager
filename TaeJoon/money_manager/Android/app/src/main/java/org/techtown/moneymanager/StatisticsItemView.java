package org.techtown.moneymanager;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.text.NumberFormat;

public class StatisticsItemView extends LinearLayout {

    TextView tv_id;
    TextView tv_percent;
    TextView tv_category;
    TextView tv_balance;

    public StatisticsItemView(Context context) {
        super(context);
        init(context);
    }

    public StatisticsItemView(Context context, AttributeSet attrs){
        super(context, attrs);
        init(context);
    }

    private void init(Context context) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        inflater.inflate(R.layout.statistics_item, this, true);

        tv_id = (TextView) findViewById(R.id.tv_id);
        tv_percent = (TextView)findViewById(R.id.tv_percent);
        tv_category = (TextView) findViewById(R.id.tv_category);
        tv_balance = (TextView) findViewById(R.id.tv_balance);
    }

    public void setId(String id){
        tv_id.setText(id);
    }

    public void setPercent(int percent){
        tv_percent.setText(String.valueOf(percent)+"%");
    }

    public void setCategory(String category){
        tv_category.setText(category);
    }

    public void setBalance(int balance){
        tv_balance.setText(String.valueOf(balance)+"원");
    }

    /*public void setMonth(String month){
        tv_month.setText(month + "월");
    }
    public void setIncome(int price){
        NumberFormat nf = NumberFormat.getInstance();
        tv_income.setText(nf.format(price) + "원");
        tv_income.setTextColor(Color.parseColor("#0000FF"));
    }
    public void setExpense(int price){
        NumberFormat nf = NumberFormat.getInstance();
        tv_expense.setText(nf.format(price) + "원");
        tv_expense.setTextColor(Color.parseColor("#FF0000"));
    }*/
}

package org.techtown.moneymanager;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.text.NumberFormat;

public class MoneyItemMonthView extends LinearLayout {

    TextView tv_id;
    TextView tv_month;
    TextView tv_income;
    TextView tv_expense;

    public MoneyItemMonthView(Context context) {
        super(context);
        init(context);
    }

    public MoneyItemMonthView(Context context, AttributeSet attrs){
        super(context, attrs);
        init(context);
    }

    private void init(Context context) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        inflater.inflate(R.layout.money_item_month, this, true);

        tv_id = (TextView) findViewById(R.id.tv_id);
        tv_month = (TextView)findViewById(R.id.tv_month);
        tv_income = (TextView) findViewById(R.id.tv_income);
        tv_expense = (TextView) findViewById(R.id.tv_expense);
    }

    public void setId(String id){
        tv_id.setText(id);
    }

    public void setMonth(String month){
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
    }
}

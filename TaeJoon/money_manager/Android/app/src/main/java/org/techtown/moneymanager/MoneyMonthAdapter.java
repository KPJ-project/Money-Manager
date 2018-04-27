package org.techtown.moneymanager;

import android.content.Context;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import java.util.ArrayList;

public class MoneyMonthAdapter extends BaseAdapter {
    ArrayList<MoneyMonthItem> items = new ArrayList<MoneyMonthItem>();


    public void addItem(MoneyMonthItem item){
        items.add(item);
    }

    @Override
    public int getCount() { return items.size(); }

    @Override
    public Object getItem(int position) {
        return items.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Context context = parent.getContext();
        MoneyItemMonthView view = new MoneyItemMonthView(context);
        MoneyMonthItem item = items.get(position);
        Log.d("hihihi",item.getMonth());
        view.setMonth(item.getMonth());
        view.setIncome(item.getPrice_income());
        view.setExpense(item.getPrice_expense());

        return view;
    }
}

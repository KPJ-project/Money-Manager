package org.techtown.moneymanager;

import android.content.Context;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;

import java.util.ArrayList;

public class StatisticsAdapter extends BaseAdapter {
    ArrayList<StatisticsItem> items = new ArrayList<StatisticsItem>();


    public void addItem(StatisticsItem item){
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
        StatisticsItemView view = new StatisticsItemView(context);
        StatisticsItem item = items.get(position);
        view.setPercent(item.getPercent());
        view.setCategory(item.getCategory());
        view.setBalance(item.getBalance());

        return view;
    }
}

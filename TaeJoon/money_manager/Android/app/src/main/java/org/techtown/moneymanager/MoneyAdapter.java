package org.techtown.moneymanager;

import android.app.Activity;
import android.content.Context;
import android.content.ContextWrapper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

public class MoneyAdapter extends BaseAdapter{
    ArrayList<MoneyItem> items = new ArrayList<MoneyItem>();

    @Override
    public int getCount() {
        return items.size();
    }

    public String getListViewItemId(int position){
        return items.get(position).getId();
    }

    public void addItem(MoneyItem item){
        items.add(item);
    }

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
        MoneyItemView view = new MoneyItemView(context);
        MoneyItem item = items.get(position);
        view.setId(item.getId());
        view.setDates(item.getDates());
        view.setCategory(item.getCategory());
        view.setContents(item.getContents());
        view.setPrice(item.getPrice(), item.getIncome());

        return view;
    }
}

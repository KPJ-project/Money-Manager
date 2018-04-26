package org.techtown.moneymanager;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    ViewPager vp;
    LinearLayout ll;
    String TAG = "######################MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_activity_main);

        vp = (ViewPager)findViewById(R.id.vp);
        ll = (LinearLayout)findViewById(R.id.ll);
        TextView tab_day = (TextView)findViewById(R.id.tab_day);
        TextView tab_week = (TextView)findViewById(R.id.tab_week);
        TextView tab_month = (TextView)findViewById(R.id.tab_month);
        TextView tab_statistics = (TextView)findViewById(R.id.tab_statistics);

        vp.setAdapter(new pagerAdapter(getSupportFragmentManager()));
        vp.setOffscreenPageLimit(3);
        vp.setCurrentItem(0);

        tab_day.setOnClickListener(movePageListener);
        tab_day.setTag(0);
        tab_week.setOnClickListener(movePageListener);
        tab_week.setTag(1);
        tab_month.setOnClickListener(movePageListener);
        tab_month.setTag(2);
        tab_statistics.setOnClickListener(movePageListener);
        tab_statistics.setTag(3);

        tab_day.setSelected(true);

        vp.addOnPageChangeListener(new ViewPager.OnPageChangeListener(){

            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                int i=0;
                while(i<4){
                    if(position==i){
                        ll.findViewWithTag(i).setSelected(true);
                    }
                    else{
                        ll.findViewWithTag(i).setSelected(false);
                    }
                    i++;
                }

            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });
    }

    View.OnClickListener movePageListener = new View.OnClickListener(){
        @Override
        public void onClick(View v) {
            int tag = (int) v.getTag();

            int i = 0;
            while (i<4){
                if(tag==i){
                    ll.findViewWithTag(i).setSelected(true);
                }
                else{
                    ll.findViewWithTag(i).setSelected(false);
                }
                i++;
            }
            vp.setCurrentItem(tag);
        }
    };

    private class pagerAdapter extends FragmentStatePagerAdapter{

        public pagerAdapter(android.support.v4.app.FragmentManager fm) {
            super(fm);
        }

        @Override
        public android.support.v4.app.Fragment getItem(int position) {
            switch(position){
                case 0:
                    return new FirstFragment();
                case 1:
                    return new SecondFragment();
                case 2:
                    return new ThirdFragment();
                case 3:
                    return new FourthFragment();
                default:
                    return null;

            }
        }

        @Override
        public int getCount() {
            return 4;
        }


    }




    @Override
    protected void onStart() {
        super.onStart();
        Log.i(TAG,"onStart");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.i(TAG,"onPause");
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.i(TAG,"onStop");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.i(TAG,"onDestroy");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.i(TAG,"onResume");
        setContentView(R.layout.fragment_activity_main);

        vp = (ViewPager)findViewById(R.id.vp);
        ll = (LinearLayout)findViewById(R.id.ll);
        TextView tab_day = (TextView)findViewById(R.id.tab_day);
        TextView tab_week = (TextView)findViewById(R.id.tab_week);
        TextView tab_month = (TextView)findViewById(R.id.tab_month);
        TextView tab_statistics = (TextView)findViewById(R.id.tab_statistics);

        vp.setAdapter(new pagerAdapter(getSupportFragmentManager()));
        vp.setOffscreenPageLimit(3);
        vp.setCurrentItem(0);

        tab_day.setOnClickListener(movePageListener);
        tab_day.setTag(0);
        tab_week.setOnClickListener(movePageListener);
        tab_week.setTag(1);
        tab_month.setOnClickListener(movePageListener);
        tab_month.setTag(2);
        tab_statistics.setOnClickListener(movePageListener);
        tab_statistics.setTag(3);

        tab_day.setSelected(true);

        vp.addOnPageChangeListener(new ViewPager.OnPageChangeListener(){

            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                int i=0;
                while(i<4){
                    if(position==i){
                        ll.findViewWithTag(i).setSelected(true);
                    }
                    else{
                        ll.findViewWithTag(i).setSelected(false);
                    }
                    i++;
                }

            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });
    }

}

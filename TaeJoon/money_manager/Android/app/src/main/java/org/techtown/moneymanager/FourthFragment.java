package org.techtown.moneymanager;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import java.util.Calendar;

public class FourthFragment extends Fragment implements View.OnClickListener{

    public FourthFragment(){

    }

    int mYear, mMonth;
    final Calendar c = Calendar.getInstance();

    TextView yearmonth;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        Log.d("ITPANGPANG","onCreateView(Fourth)");
        LinearLayout layout = (LinearLayout) inflater.inflate(R.layout.fragment_fourth, container, false);

        mYear = c.get(Calendar.YEAR);
        mMonth = c.get(Calendar.MONTH);

        yearmonth = (TextView)layout.findViewById(R.id.yearmonth);

        yearmonth.setText((String.format("%2d-%02d", mYear, mMonth + 1)));

        Button income, expense, downmonth, upmonth;
        income=(Button)layout.findViewById(R.id.income);
        income.setOnClickListener(this);
        expense=(Button)layout.findViewById(R.id.expense);
        expense.setOnClickListener(this);
        downmonth=(Button)layout.findViewById(R.id.downmonth);
        downmonth.setOnClickListener(this);
        upmonth=(Button)layout.findViewById(R.id.upmonth);
        upmonth.setOnClickListener(this);

        return layout;
    }

    @Override
    public void onDestroy() {
        Log.d("ITPANGPANG","onDestroyView(Fourth)");
        super.onDestroy();
    }

    @Override
    public void onClick(View v) {

        Fragment fg;
        switch(v.getId()){
            case R.id.income:
                fg = StatisticsIncome.newInstance();
                setChildFragment(fg);
                break;
            case R.id.expense:
                fg = StatisticsExpense.newInstance();
                setChildFragment(fg);
                break;
            case R.id.downmonth:
                Integer year = Integer.parseInt(""+yearmonth.getText().subSequence(0,4));
                Integer month = Integer.parseInt(""+yearmonth.getText().subSequence(5,7));
                if (month==1){
                    month=12;
                    year=year-1;
                }
                else{
                    month-=1;
                }
                yearmonth.setText((String.format("%2d-%02d", year, month)));
                break;
            case R.id.upmonth:
                Integer yearup = Integer.parseInt(""+yearmonth.getText().subSequence(0,4));
                Integer monthup = Integer.parseInt(""+yearmonth.getText().subSequence(5,7));
                if (monthup==12){
                    monthup=1;
                    yearup=yearup+1;
                }
                else{
                    monthup+=1;
                }
                yearmonth.setText((String.format("%2d-%02d", yearup, monthup)));
                break;
        }

    }

    private void setChildFragment(Fragment child){
        FragmentTransaction childFt = getChildFragmentManager().beginTransaction();

        if(!child.isAdded()){
            childFt.replace(R.id.child_fragment_container, child);
            childFt.addToBackStack(null);
            childFt.commit();
        }
    }
}

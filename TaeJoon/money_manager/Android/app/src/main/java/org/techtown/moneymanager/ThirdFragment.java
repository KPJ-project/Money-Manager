package org.techtown.moneymanager;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;

public class ThirdFragment extends Fragment{

    public ThirdFragment(){

    }
    TextView tv;
    int i = 0;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        Log.d("ITPANGPANG","onCreateView(Third)");
        RelativeLayout layout = (RelativeLayout) inflater.inflate(R.layout.fragment_third, container, false);
        tv = (TextView)layout.findViewById(R.id.tv);
        Button btn = (Button)layout.findViewById(R.id.btn);
        btn.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View v) {
                i++;
                tv.setText(""+i);
            }
        });
        return layout;
    }
    @Override
    public void onDestroy() {
        Log.d("ITPANGPANG","onDestroyView(Third)");
        super.onDestroy();
    }
}

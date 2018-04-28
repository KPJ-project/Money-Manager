package org.techtown.moneymanager;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StatisticsExpense extends Fragment{
    public static StatisticsExpense newInstance(){
        return new StatisticsExpense();
    }

    TextView yearmonth;
    ListView listView;
    StatisticsAdapter adapter;

    int total=0;
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        FourthFragment parentFg = ((FourthFragment)StatisticsExpense.this.getParentFragment());
        Integer year = Integer.parseInt(""+parentFg.yearmonth.getText().subSequence(0,4));
        Integer month = Integer.parseInt(""+parentFg.yearmonth.getText().subSequence(5,7));

        String url = "http://192.168.56.1:8080/api/statistics/expense/"+year+"/"+month;
        //String url = "http://192.168.56.1:8080/api/data";
        StringRequest request = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {

            @Override
            public void onResponse(String response) {
                try {

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace(); }
        }) {
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                Map<String, String> params = new HashMap<>();
                return params;
            }
        };
        Volley.newRequestQueue(getActivity().getApplicationContext()).add(request);
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        RelativeLayout layout = (RelativeLayout) inflater.inflate(R.layout.statistics_expense,container,false);

        listView = (ListView)layout.findViewById(R.id.listView);

        FourthFragment parentFg = ((FourthFragment)StatisticsExpense.this.getParentFragment());
        Integer year = Integer.parseInt(""+parentFg.yearmonth.getText().subSequence(0,4));
        Integer month = Integer.parseInt(""+parentFg.yearmonth.getText().subSequence(5,7));

        String url = "http://192.168.56.1:8080/api/statistics/expense/"+year+"/"+month;
        //String url = "http://192.168.56.1:8080/api/data";
        StringRequest request = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {

            @Override
            public void onResponse(String response) {
                try {
                    doJSONParser(response);

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace(); }
        }) {
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                Map<String, String> params = new HashMap<>();
                return params;
            }
        };
        Volley.newRequestQueue(getActivity().getApplicationContext()).add(request);

        return layout;
    }

    void doJSONParser(String str){
        StringBuffer sb = new StringBuffer();
        adapter = new StatisticsAdapter();

        try{
            JSONArray jsonArray = new JSONArray(str);
            for(int i=0; i < jsonArray.length(); i++){
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                String category = jsonObject.getString("_id");
                int balance = jsonObject.getInt("balance");

                total+=balance;

                adapter.addItem(new StatisticsItem(balance, category, balance));
                //sb.append("_id : " + _id + ", date : " + date + ", category : " + category + ", contents : " + contents + ", price : " + price + "\n");
            }
            listView.setAdapter(adapter);

            //textView.append(sb);

        } catch (JSONException e){
            e.printStackTrace();
        }
    }
}

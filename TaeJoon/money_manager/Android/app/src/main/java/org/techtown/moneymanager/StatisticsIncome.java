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
import java.util.Map;

public class StatisticsIncome extends Fragment {
    public static StatisticsIncome newInstance(){
        return new StatisticsIncome();
    }

    TextView yearmonth;
    ListView listView;
    StatisticsAdapter adapter;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        FourthFragment parentFg = ((FourthFragment)StatisticsIncome.this.getParentFragment());
        Integer year = Integer.parseInt(""+parentFg.yearmonth.getText().subSequence(0,4));
        Integer month = Integer.parseInt(""+parentFg.yearmonth.getText().subSequence(5,7));

        String url = "http://192.168.56.1:8080/api/statistics/income/"+year+"/"+month;
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
        RelativeLayout layout = (RelativeLayout) inflater.inflate(R.layout.statistics_income,container,false);

        listView = (ListView)layout.findViewById(R.id.listView);

        FourthFragment parentFg = ((FourthFragment)StatisticsIncome.this.getParentFragment());
        Integer year = Integer.parseInt(""+parentFg.yearmonth.getText().subSequence(0,4));
        Integer month = Integer.parseInt(""+parentFg.yearmonth.getText().subSequence(5,7));

        String url = "http://192.168.56.1:8080/api/statistics/income/"+year+"/"+month;
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
        adapter = new StatisticsAdapter();

        try{
            JSONArray jsonArray = new JSONArray(str);
            for(int i=0; i < jsonArray.length(); i++){
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                String housekeepingbooks = jsonObject.getString("housekeepingbooks");
                String temp = "["+housekeepingbooks+"]";

                JSONArray jsonArray1 = new JSONArray(temp);
                JSONObject jsonObject1 = jsonArray1.getJSONObject(0);

                String category = jsonObject1.getString("category");
                int price = jsonObject1.getInt("price");
                double totalprice = jsonObject.getInt("totalprice");
                double percent = (price/totalprice)*100;
                //Toast.makeText(getActivity(), String.valueOf((int)percent), Toast.LENGTH_SHORT).show();

                adapter.addItem(new StatisticsItem((int)percent, category, price));
            }
            listView.setAdapter(adapter);

            //textView.append(sb);

        } catch (JSONException e){
            e.printStackTrace();
        }
    }
}

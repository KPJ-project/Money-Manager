package org.techtown.moneymanager;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

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

public class ThirdFragment extends Fragment{

    public ThirdFragment(){

    }
    ListView listView;
    MoneyMonthAdapter adapter;


    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("ITPANGPANG","onCreate(Third)");

        String url = "http://192.168.56.1:8080/api/data/2018";
        //String url = "http://192.168.56.1:8080/api/data";
        StringRequest request = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {

            @Override
            public void onResponse(String response) {
                try {
                    //doJSONParser(response);
                    //Toast.makeText(getActivity(), response.toString(), Toast.LENGTH_SHORT).show();
                    Log.d("tjoon",response.toString());
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
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        Log.d("ITPANGPANG","onCreateView(Third)");
        RelativeLayout layout = (RelativeLayout) inflater.inflate(R.layout.fragment_third, container, false);

        listView = (ListView)layout.findViewById(R.id.listView);

        String url = "http://192.168.56.1:8080/api/data/2018";
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
        adapter = new MoneyMonthAdapter();

        int price_income=0;
        int price_expense=0;
        String init_month;
        String month="";
        int i=0;
        try{
            JSONArray jsonArray = new JSONArray(str);
            int l=jsonArray.length();
            for(; i < l; i++){
                price_income=0;
                price_expense=0;
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                String _id = jsonObject.getString("_id");
                month = jsonObject.getString("month");
                init_month=month;
                int price = jsonObject.getInt("price");
                boolean income = jsonObject.getBoolean("income");
                if(income){
                    price_income+=price;
                }
                else {
                    price_expense+=price;
                }
                i+=1;
                while(i<l){
                    JSONObject jsonObject2 = jsonArray.getJSONObject(i);
                    String month2 = jsonObject2.getString("month");
                    price = jsonObject2.getInt("price");
                    if (init_month.equals(month2)){
                        i+=1;
                        if(income){
                            price_income+=price;
                        }
                        else {
                            price_expense+=price;
                        }
                    }
                    else{
                        i-=1;
                        break;
                    }
                }
                adapter.addItem(new MoneyMonthItem(month, price_income ,price_expense, income));
                //sb.append("_id : " + _id + ", date : " + date + ", category : " + category + ", contents : " + contents + ", price : " + price + "\n");
            }
            listView.setAdapter(adapter);

            //textView.append(sb);

        } catch (JSONException e){
            e.printStackTrace();
        }

    }

    @Override
    public void onDestroy() {
        Log.d("ITPANGPANG","onDestroyView(Third)");
        super.onDestroy();
    }
}

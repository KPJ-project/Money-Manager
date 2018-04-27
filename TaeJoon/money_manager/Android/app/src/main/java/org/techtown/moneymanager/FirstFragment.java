package org.techtown.moneymanager;

import android.content.Intent;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
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

import java.text.NumberFormat;
import java.util.HashMap;
import java.util.Map;



public class FirstFragment extends Fragment{

    public FirstFragment(){

    }

    TextView tv;
    ListView listView;
    MoneyAdapter adapter;
    FloatingActionButton fab;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        Log.d("ITPANGPANG","onCreateView(First)");
        RelativeLayout layout = (RelativeLayout) inflater.inflate(R.layout.fragment_first, container, false);

        listView = (ListView)layout.findViewById(R.id.listView);

        String url = "http://192.168.56.1:8080/api/data";
        StringRequest request = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {

            @Override
            public void onResponse(String response) {
                try {
                    doJSONParser(response);
                    //Toast.makeText(getActivity(), response.toString(), Toast.LENGTH_SHORT).show();
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

        fab=layout.findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener(){

            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getActivity(), MoneyCreate.class);
                startActivity(intent);
            }
        });


        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(getActivity(), MoneyDetail.class);
                intent.putExtra("id",adapter.getListViewItemId(position));
                startActivity(intent);
            }
        });

        return layout;
    }

    void doJSONParser(String str){
        StringBuffer sb = new StringBuffer();
        adapter = new MoneyAdapter();

        try{
            JSONArray jsonArray = new JSONArray(str);
            for(int i=0; i < jsonArray.length(); i++){
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                String _id = jsonObject.getString("_id");
                String date = jsonObject.getString("date").substring(0,10);
                String category = jsonObject.getString("category");
                String contents = jsonObject.getString("contents");
                int price = jsonObject.getInt("price");
                boolean income = jsonObject.getBoolean("income");

                adapter.addItem(new MoneyItem(_id, date,category,contents, price, income));
                //sb.append("_id : " + _id + ", date : " + date + ", category : " + category + ", contents : " + contents + ", price : " + price + "\n");
            }
            listView.setAdapter(adapter);

            //textView.append(sb);

        } catch (JSONException e){
            e.printStackTrace();
        }

    }

    @Override
    public void onResume() {
        super.onResume();


    }

    @Override
    public void onDestroy() {
        Log.d("ITPANGPANG","onDestroyView(First)");
        super.onDestroy();
    }

    private void refresh(){
        FragmentTransaction transaction = getFragmentManager().beginTransaction();
        transaction.detach(this).attach(this).commit();
    }
}

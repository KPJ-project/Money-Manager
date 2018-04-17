package org.techtown.moneymanager;

import android.content.Intent;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.BaseAdapter;
import android.widget.EditText;
import android.widget.ListView;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {
    String TAG = "######################MainActivity";

    EditText editText;
    TextView textView;

    Handler handler = new Handler();

    ListView listView;
    MoneyAdapter adapter;
    ArrayList<MoneyItem> items = new ArrayList<MoneyItem>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Log.i(TAG,"onCreate");

        textView = (TextView) findViewById(R.id.textView);

        listView = (ListView) findViewById(R.id.listView);


        String url = "http://192.168.56.1:8080/api/data";
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
        Volley.newRequestQueue(this).add(request);



        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(MainActivity.this, MoneyDetail.class);
                intent.putExtra("id",adapter.getListViewItemId(position));
                startActivity(intent);
            }
        });

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
        String url = "http://192.168.56.1:8080/api/data";
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
        Volley.newRequestQueue(this).add(request);
    }


    public void onButton1Clicked(View v){
        String url = "http://192.168.56.1:8080/api/data";

        StringRequest request = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                try {
                    doJSONParser(response);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                }) {
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                Map<String, String> params = new HashMap<>();
                return params;
            }
        };

        Volley.newRequestQueue(this).add(request);
    }
    public void onButton2Clicked(View v){
        Intent intent = new Intent(this, MoneyCreate.class);
        startActivity(intent);

    }
    public void onListViewClicked(View v){
        Intent intent = new Intent(this, MoneyDetail.class);
        startActivity(intent);

    }
    public void println(final String data){
        handler.post(new Runnable(){
            public void run(){
                textView.append(data + '\n');
            }
        });
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
                adapter.addItem(new MoneyItem(_id, date,category,contents, price));
                sb.append("_id : " + _id + ", date : " + date + ", category : " + category + ", contents : " + contents + ", price : " + price + "\n");
            }
            listView.setAdapter(adapter);

            //textView.append(sb);

        } catch (JSONException e){
            e.printStackTrace();
        }

    }



    class MoneyAdapter extends BaseAdapter {
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
            MoneyItemView view = new MoneyItemView(getApplicationContext());
            MoneyItem item = items.get(position);
            view.setId(item.getId());
            view.setDates(item.getDates());
            view.setCategory(item.getCategory());
            view.setContents(item.getContents());
            view.setPrice(item.getPrice());

            return view;
        }
    }

}

package org.techtown.moneymanager;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MoneyDetail extends AppCompatActivity {
    String TAG = "######################MoneyDetail";

    EditText dateEv;
    EditText categoryEv;
    EditText contentsEv;
    EditText priceEv;
    EditText etcEv;
    String id;
    ImageView receiptView;
    Bitmap bitmap;

    String receipt;


    int mYear, mMonth, mDay;

    MoneyAdapter adapter;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.money_detail);
        Log.i(TAG,"onCreate");

        Intent intent = getIntent();

        dateEv = (EditText) findViewById(R.id.dateEv);
        categoryEv = (EditText) findViewById(R.id.categoryEv);
        contentsEv = (EditText) findViewById(R.id.contentsEv);
        priceEv = (EditText) findViewById(R.id.priceEv);
        etcEv = (EditText) findViewById(R.id.etcEv);


        receiptView = (ImageView)findViewById(R.id.receiptView);


        id = intent.getStringExtra("id");
        String url = "http://192.168.56.1:8080/api/data/"+id;

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


    public void btnChangeDateClicked(View v){
        switch(v.getId()){
            //날짜 대화상자 버튼이 눌리면 대화상자를 보여줌
            case R.id.btnChangeDate:
                //여기서 리스너도 등록함
                new DatePickerDialog(this, mDateSetListener, mYear, mMonth, mDay).show();
                break;
        }
    }

    DatePickerDialog.OnDateSetListener mDateSetListener = new DatePickerDialog.OnDateSetListener() {
        @Override
        public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
            mYear = year;
            mMonth = month;
            mDay = dayOfMonth;

            UpdateNow();
        }
    };

    void UpdateNow(){

        dateEv.setText(String.format("%2d/%02d/%02d", mYear, mMonth + 1, mDay));
    }


    @Override
    protected void onStart() {
        super.onStart();
        Log.i(TAG,"onStart");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.i(TAG,"onResume");
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

    public class JSONTask extends AsyncTask<String, String, String> {

        @Override
        protected String doInBackground(String... strings) {
            try{

                String category = categoryEv.getText().toString();
                String contents = contentsEv.getText().toString();
                String price = priceEv.getText().toString();
                String etc = etcEv.getText().toString();

                JSONObject jsonObject = new JSONObject();
                jsonObject.accumulate("category", category);
                jsonObject.accumulate("contents", contents);
                jsonObject.accumulate("price", price);
                jsonObject.accumulate("etc", etc);

                HttpURLConnection con = null;
                BufferedReader reader = null;

                try{
                    //URL url = new URL("http://192.168.56.1:8080/api/create");
                    URL url = new URL(strings[0]);
                    con = (HttpURLConnection) url.openConnection();

                    con.setRequestMethod("POST");//POST방식으로 보냄
                    con.setRequestProperty("Cache-Control", "no-cache");//캐시 설정
                    con.setRequestProperty("Content-Type", "application/json");//application JSON 형식으로 전송
                    con.setRequestProperty("Accept", "text/html");//서버에 response 데이터를 html로 받음
                    con.setDoOutput(true);//Outstream으로 post 데이터를 넘겨주겠다는 의미
                    con.setDoInput(true);//Inputstream으로 서버로부터 응답을 받겠다는 의미
                    con.connect();

                    OutputStream outputStream = con.getOutputStream();
                    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream));
                    writer.write(jsonObject.toString());
                    writer.flush();
                    writer.close();

                    InputStream stream = con.getInputStream();

                    reader = new BufferedReader(new InputStreamReader(stream));

                    StringBuffer buffer = new StringBuffer();

                    String line = "";
                    while((line = reader.readLine()) != null){
                        buffer.append(line);
                    }

                    return buffer.toString();//서버로 부터 받은 값을 리턴해줌 아마 OK!!가 들어올것임

                } catch (MalformedURLException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return null;
        }
    }

    public void changeBtnClicked(View v){
        new JSONTask().execute("http://192.168.56.1:8080/api/update/"+id);
        this.finish();
    }

    public void deleteBtnClicked(View v){
        String url = "http://192.168.56.1:8080/api/delete/"+id;
        StringRequest request = new StringRequest(Request.Method.DELETE, url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
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
        this.finish();
    }

    void doJSONParser(String str){
        try {

            JSONObject jObject = new JSONObject(str);
            String date = jObject.getString("date").substring(0,10);
            String category = jObject.getString("category");
            String contents = jObject.getString("contents");
            String price = jObject.getString("price");
            String etc = jObject.getString("etc");
            receipt = jObject.getString("receipt");



            //Toast.makeText(this, receipt, Toast.LENGTH_SHORT).show();

            categoryEv.setText(category);
            dateEv.setText(date);
            contentsEv.setText(contents);
            priceEv.setText(price);
            etcEv.setText(etc);




            Thread mThread = new Thread(){
                @Override
                public void run() {
                    try {
                        URL url = new URL("http://192.168.56.1:8080/download/"+receipt);

                        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                        conn.setDoInput(true);
                        conn.connect();

                        InputStream is = conn.getInputStream();
                        bitmap = BitmapFactory.decodeStream(is);
                    } catch (MalformedURLException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            };
            mThread.start();

            try {
                mThread.join();
                receiptView.setImageBitmap(bitmap);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }



        } catch (JSONException e) {
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

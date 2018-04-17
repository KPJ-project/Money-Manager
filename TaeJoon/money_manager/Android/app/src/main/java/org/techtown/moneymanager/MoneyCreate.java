package org.techtown.moneymanager;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

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
import java.util.Calendar;


public class MoneyCreate extends AppCompatActivity {
    String TAG = "######################MoneyCreate";

    EditText dateEv;
    EditText categoryEv;
    EditText contentsEv;
    EditText priceEv;
    EditText etcEv;
    Button receiptSelect;
    String receipt;

    int mYear, mMonth, mDay;

    final int REQ_CODE_SELECT_IMAGE=100;

    ImageView image;



    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.money_create);

        dateEv = (EditText) findViewById(R.id.dateEv);
        categoryEv = (EditText) findViewById(R.id.categoryEv);
        contentsEv = (EditText) findViewById(R.id.contentsEv);
        priceEv = (EditText) findViewById(R.id.priceEv);
        etcEv = (EditText) findViewById(R.id.etcEv);
        receiptSelect = (Button)findViewById(R.id.receiptSelect);

        final Calendar c = Calendar.getInstance();

        mYear = c.get(Calendar.YEAR);
        mMonth = c.get(Calendar.MONTH);
        mDay = c.get(Calendar.DAY_OF_MONTH);

        dateEv.setText((String.format("%2d-%02d-%02d", mYear, mMonth + 1, mDay)));

        Intent intent = getIntent();

        receiptSelect.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_PICK);
                intent.setType(MediaStore.Images.Media.CONTENT_TYPE);
                intent.setData(MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                startActivityForResult(intent, REQ_CODE_SELECT_IMAGE);
            }
        });

    }

    public String getImageNameToUri(Uri data){
        String[] proj = {MediaStore.Images.Media.DATA};
        Cursor cursor = managedQuery(data, proj, null, null, null);
        int colum_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);

        cursor.moveToFirst();

        String imgPath = cursor.getString(colum_index);
        String imgName = imgPath.substring(imgPath.lastIndexOf("/")+1);

        return imgPath;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        //super.onActivityResult(requestCode, resultCode, data);

        if(requestCode == REQ_CODE_SELECT_IMAGE){
            if(resultCode== Activity.RESULT_OK){
                try {

                    receipt = getImageNameToUri(data.getData());
                    Toast.makeText(this, receipt, Toast.LENGTH_SHORT).show();
                    Bitmap image_bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), data.getData());
                    image = (ImageView)findViewById(R.id.receiptView);

                    image.setImageBitmap(image_bitmap);




                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

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
        dateEv.setText(String.format("%2d-%02d-%02d", mYear, mMonth + 1, mDay));
    }

    public class JSONTask extends AsyncTask<String, String, String>{

        @Override
        protected String doInBackground(String... strings) {

            try{
                String date = dateEv.getText().toString();
                String category = categoryEv.getText().toString();
                String contents = contentsEv.getText().toString();
                String price = priceEv.getText().toString();
                String etc = etcEv.getText().toString();

                JSONObject jsonObject = new JSONObject();
                jsonObject.accumulate("date", date);
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

                    Log.v("#####", buffer.toString());

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

    public void enrollBtnClicked(View v){
        new JSONTask().execute("http://192.168.56.1:8080/api/create");
        this.finish();
        /*String url = "http://192.168.56.1:8080/api/create";
        BufferedReader reader = null;
        try {
            URL urlCon = new URL(url);
            HttpURLConnection httpURLConnection = (HttpURLConnection)urlCon.openConnection();

            String json = "";

            String dates = dateEv.getText().toString();
            String category = categoryEv.getText().toString();
            String contents = contentsEv.getText().toString();
            String price = priceEv.getText().toString();

            JSONObject jsonObject = new JSONObject();
            jsonObject.accumulate("date",dates);
            jsonObject.accumulate("category",category);
            jsonObject.accumulate("contents",contents);
            jsonObject.accumulate("price",price);

            json = jsonObject.toString();


            httpURLConnection.setRequestMethod("POST");
            httpURLConnection.setRequestProperty("Accept", "application/json");
            httpURLConnection.setRequestProperty("Content-type", "application/json");

            httpURLConnection.setDoOutput(true);
            httpURLConnection.setDoInput(true);

            OutputStream os = httpURLConnection.getOutputStream();
            os.write(json.getBytes("euc-kr"));
            os.flush();
            os.close();
            httpURLConnection.disconnect();

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }*/

    }
}

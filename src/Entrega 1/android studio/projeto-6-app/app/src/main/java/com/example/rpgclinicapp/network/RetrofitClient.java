package com.example.rpgclinicapp.network;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    // URL especial do emulador Android para acessar o 'localhost' do computador
    private static final String BASE_URL = "https://lnyv32-3000.csb.app/";

    private static Retrofit retrofit = null;

    public static ClinicApiService getApiService() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit.create(ClinicApiService.class);
    }
}

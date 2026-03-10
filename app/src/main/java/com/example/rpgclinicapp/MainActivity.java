package com.example.rpgclinicapp;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Oculta a Action Bar superior
        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }
        setContentView(R.layout.activity_main);

        // Configura o clique no botão "Agenda" da barra inferior
        android.widget.LinearLayout navAgenda = findViewById(R.id.nav_agenda);
        if (navAgenda != null) {
            navAgenda.setOnClickListener(new android.view.View.OnClickListener() {
                @Override
                public void onClick(android.view.View v) {
                    android.content.Intent intent = new android.content.Intent(MainActivity.this, AgendaActivity.class);
                    startActivity(intent);
                }
            });
        }
    }
}
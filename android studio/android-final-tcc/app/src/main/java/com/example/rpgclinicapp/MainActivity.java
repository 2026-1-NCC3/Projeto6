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

        // Configura o nome do usuário dinamicamente
        String nomeUsuario = getIntent().getStringExtra("NOME_USUARIO");
        if (nomeUsuario != null && !nomeUsuario.isEmpty()) {
            android.widget.TextView tvSaudacao = findViewById(R.id.tv_saudacao);
            android.widget.TextView tvNomeHeader = findViewById(R.id.tv_nome_header);
            
            if (tvSaudacao != null) {
                String primeiroNome = nomeUsuario.split(" ")[0];
                tvSaudacao.setText("Bem vindo, " + primeiroNome + "!");
            }
            if (tvNomeHeader != null) {
                tvNomeHeader.setText(nomeUsuario);
            }
        }

        // Configura o clique no botão "Início" para restaurar a tela principal
        android.widget.LinearLayout navInicio = findViewById(R.id.nav_inicio);
        if (navInicio != null) {
            navInicio.setOnClickListener(new android.view.View.OnClickListener() {
                @Override
                public void onClick(android.view.View v) {
                    findViewById(R.id.fragment_container).setVisibility(android.view.View.GONE);
                    findViewById(R.id.main_content).setVisibility(android.view.View.VISIBLE);
                }
            });
        }

        // Configura o clique no botão "Perfil" para carregar o Fragment
        android.widget.LinearLayout navPerfil = findViewById(R.id.nav_perfil);
        if (navPerfil != null) {
            navPerfil.setOnClickListener(new android.view.View.OnClickListener() {
                @Override
                public void onClick(android.view.View v) {
                    findViewById(R.id.main_content).setVisibility(android.view.View.GONE);
                    findViewById(R.id.fragment_container).setVisibility(android.view.View.VISIBLE);
                    
                    getSupportFragmentManager().beginTransaction()
                            .replace(R.id.fragment_container, new PerfilFragment())
                            .commit();
                }
            });
        }

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

        // Configura o clique no botão "Exercícios" da barra inferior
        android.widget.LinearLayout navExercicios = findViewById(R.id.nav_exercicios);
        if (navExercicios != null) {
            navExercicios.setOnClickListener(new android.view.View.OnClickListener() {
                @Override
                public void onClick(android.view.View v) {
                    android.content.Intent intent = new android.content.Intent(MainActivity.this,
                            ExerciciosActivity.class);
                    startActivity(intent);
                }
            });
        }

        // Configura o clique no botão "Progresso" da barra inferior
        android.widget.LinearLayout navProgresso = findViewById(R.id.nav_progresso);
        if (navProgresso != null) {
            navProgresso.setOnClickListener(new android.view.View.OnClickListener() {
                @Override
                public void onClick(android.view.View v) {
                    android.content.Intent intent = new android.content.Intent(MainActivity.this,
                            ProgressoActivity.class);
                    startActivity(intent);
                }
            });
        }
        
        checkOpenProfile();
    }
    
    @Override
    protected void onNewIntent(android.content.Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        checkOpenProfile();
    }

    private void checkOpenProfile() {
        if (getIntent().getBooleanExtra("OPEN_PROFILE", false)) {
            findViewById(R.id.main_content).setVisibility(android.view.View.GONE);
            findViewById(R.id.fragment_container).setVisibility(android.view.View.VISIBLE);
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.fragment_container, new PerfilFragment())
                    .commit();
            getIntent().removeExtra("OPEN_PROFILE");
        }
    }
}
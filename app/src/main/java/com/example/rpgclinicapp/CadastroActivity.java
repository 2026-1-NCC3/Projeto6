package com.example.rpgclinicapp;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.rpgclinicapp.models.CadastroRequest;
import com.example.rpgclinicapp.models.LoginResponse;
import com.example.rpgclinicapp.network.RetrofitClient;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CadastroActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Oculta a Action Bar
        if (getSupportActionBar() != null) {
            getSupportActionBar().hide();
        }

        setContentView(R.layout.activity_cadastro);

        EditText etNome = findViewById(R.id.et_nome_cadastro);
        EditText etEmail = findViewById(R.id.et_email_cadastro);
        EditText etPassword = findViewById(R.id.et_password_cadastro);
        Button btnCadastrar = findViewById(R.id.btn_cadastrar);
        TextView tvVoltarLogin = findViewById(R.id.tv_voltar_login);

        tvVoltarLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish(); // Volta para a tela de Login (que já está na pilha)
            }
        });

        btnCadastrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String nome = etNome.getText().toString().trim();
                String email = etEmail.getText().toString().trim();
                String senha = etPassword.getText().toString().trim();

                if (nome.isEmpty() || email.isEmpty() || senha.isEmpty()) {
                    Toast.makeText(CadastroActivity.this, "Por favor, preencha todos os campos.", Toast.LENGTH_SHORT)
                            .show();
                    return;
                }

                btnCadastrar.setEnabled(false);
                btnCadastrar.setText("CADASTRANDO...");

                CadastroRequest request = new CadastroRequest(nome, email, senha);
                RetrofitClient.getApiService().cadastrar(request).enqueue(new Callback<LoginResponse>() {
                    @Override
                    public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                        btnCadastrar.setEnabled(true);
                        btnCadastrar.setText("CRIAR CONTA");

                        if (response.isSuccessful() && response.body() != null) {
                            LoginResponse resp = response.body();
                            if (resp.isSucesso()) {
                                Toast.makeText(CadastroActivity.this, "Cadastro realizado com sucesso!",
                                        Toast.LENGTH_SHORT).show();
                                // Voltamos ao Login para a pessoa logar com as credenciais (ou já logamos
                                // direto se o mockup pedir)
                                finish();
                            } else {
                                Toast.makeText(CadastroActivity.this, "Erro: " + resp.getErro(), Toast.LENGTH_SHORT)
                                        .show();
                            }
                        } else {
                            Toast.makeText(CadastroActivity.this, "Falha ao cadastrar. Tente novamente.",
                                    Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<LoginResponse> call, Throwable t) {
                        btnCadastrar.setEnabled(true);
                        btnCadastrar.setText("CRIAR CONTA");
                        Toast.makeText(CadastroActivity.this, "Erro de rede: " + t.getMessage(), Toast.LENGTH_SHORT)
                                .show();
                    }
                });
            }
        });
    }
}

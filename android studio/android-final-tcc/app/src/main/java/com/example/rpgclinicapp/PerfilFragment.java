package com.example.rpgclinicapp;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class PerfilFragment extends Fragment {

    public PerfilFragment() {
        // Necessário construtor público vazio
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        // Infla o layout usando tag ConstraintLayout para esta visualização de fragmento
        View view = inflater.inflate(R.layout.fragment_perfil, container, false);
        
        android.widget.TextView tvNome = view.findViewById(R.id.tv_perfil_nome);
        if (tvNome != null && getActivity() != null && getActivity().getIntent() != null) {
            String nomeUsuario = getActivity().getIntent().getStringExtra("NOME_USUARIO");
            if (nomeUsuario != null && !nomeUsuario.isEmpty()) {
                tvNome.setText(nomeUsuario);
            }
        }
        
        Button btnSair = view.findViewById(R.id.btn_sair_conta);
        btnSair.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Ao clicar em sair, chama a LoginActivity resetando a pilha
                Intent intent = new Intent(getActivity(), LoginActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
            }
        });

        return view;
    }
}

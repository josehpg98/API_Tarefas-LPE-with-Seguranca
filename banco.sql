create table pessoa (
	codigo serial not null primary key,
	nome varchar(50) not null,
    cidade varchar(50) not null,
    uf varchar(2) not null
);
create table tarefa (
	codigo serial not null primary key,
	titulo varchar(50) not null,
	descricao varchar(150) not null,
	codigo_pessoa serial not null,
	foreign key (codigo_pessoa) REFERENCES pessoa (codigo)
);

create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

insert into tarefa(codigo, titulo, descricao,codigo_pessoa) values (1, 'mercado','comprar feijao',1)
insert into pessoa(codigo, nome, cidade, uf) values (1, 'jose da silva', 'passo fundo', 'RS')
insert into usuarios (email, senha, tipo, telefone, nome) 
values ('jorgebavaresco@ifsul.edu.br', '123456', 'A','(54)99984-4348','Jorge Bavaresco'), 
('joao@ifsul.edu.br', '123456', 'U','(54)44484-4348','Joao');

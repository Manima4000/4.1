using System;
using System.IO;
using System.Net.Mail;
using System.Threading.Tasks;
using YahooFinanceApi;
using Microsoft.Extensions.Configuration;


if (args.Length != 3)
{
    Console.WriteLine("Rode esse comando: dotnet run -- <Ativo> <PreçoVenda> <PreçoCompra>");
    return;
}

//Configurando oo ambiente para acessar os Gerenciadores de Segredo para acessar a senha do email
var builder = new ConfigurationBuilder()
    .AddUserSecrets<Program>();
var configSecrets = builder.Build();

//Na api da Yahoo Finance, os ativos precisam da extensão .SA
string ativo = args[0] + ".SA";

//Coloquei esse outro parametro para o código ler um numero "37.80" como decimal, para não ler como 3780
decimal precoVenda = decimal.Parse(args[1], System.Globalization.CultureInfo.InvariantCulture);
decimal precoCompra = decimal.Parse(args[2], System.Globalization.CultureInfo.InvariantCulture);

// Ler configurações de e-mail no arquivo config.txt
string[] config = File.ReadAllLines("config.txt");
string emailDestino = config[0];
string smtpServidor = config[1];
int smtpPorta = int.Parse(config[2]);
string smtpUsuario = config[3];
//Para rodar o código precisa setar a senha do email utilizado para criação de alertas nas variaveis de sistema. Rode o codigo: dotnet user-secrets set "SMTP_PASSWORD" "SenhaDoEmail"
string smtpSenha = configSecrets["SMTP_PASSWORD"];
if (string.IsNullOrEmpty(smtpSenha))
{
    Console.WriteLine("Erro: O segredo 'SMTP_PASSWORD' não foi configurado.");
    return;
}


Console.WriteLine($"Monitorando {ativo}...");

while (true)
{
    try
    {
        var securities = await Yahoo.Symbols(ativo).Fields(Field.RegularMarketPrice).QueryAsync();
        decimal precoAtual = (decimal)securities[ativo].RegularMarketPrice;
        Console.WriteLine($"Cotação atual de {ativo}: {precoAtual}");

        if (precoAtual >= precoVenda)
        {
            EnviarEmail(emailDestino, "Alerta de Venda", $"O preço de {ativo} subiu para {precoAtual}, acima do limite de {precoVenda}", smtpServidor, smtpPorta, smtpUsuario, smtpSenha);
            break;
        }
        else if (precoAtual <= precoCompra)
        {
            EnviarEmail(emailDestino, "Alerta de Compra", $"O preço de {ativo} caiu para {precoAtual}, abaixo do limite de {precoCompra}", smtpServidor, smtpPorta, smtpUsuario, smtpSenha);
            break;
        }
        else
        {
            await Task.Delay(1000); //Retardando o loop a cada 1 segundo
            continue;
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Erro ao obter cotação: " + ex.Message);
    }
}

void EnviarEmail(string destino, string assunto, string corpo, string smtpServidor, int smtpPorta, string usuario, string senha)
{
    try
    {
        using (SmtpClient client = new SmtpClient(smtpServidor, smtpPorta))
        {
            client.Credentials = new System.Net.NetworkCredential(usuario, senha);
            client.EnableSsl = true;

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(usuario);
            mail.To.Add(destino);
            mail.Subject = assunto;
            mail.Body = corpo;
            client.Send(mail);

            Console.WriteLine("Alerta enviado por e-mail.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Erro ao enviar e-mail: " + ex.Message);
    }
}

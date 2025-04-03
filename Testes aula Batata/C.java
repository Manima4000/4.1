df

public clas CartaoDebito {
    public void pagar(int totalPagar) {...}
}

public clas PontoComercial {
    private CartaoDebito cartao;
    public PontoComercial(CartaoDebito umC) {this.cartao = umC;}
    public void cobrar(Object pedido, int valor) {this.cartao.pagar(valor)}
}
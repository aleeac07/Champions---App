const request = require('supertest');
const express = require('express');
const chai = require('chai');
const expect = chai.expect;

// Importa tu handler/router (ajusta la ruta)
const handler = require('../../ruta/a/tu/handler');

const app = express();
app.use(express.json());
app.use('/', handler);

describe('GET /champions-league/teams/:groupId', () => {

  /**
   * ✅ Happy path (lo típico que genera la IA)
   */
  it('should return data for valid input', async () => {
    const res = await request(app).get('/champions-league/teams/A');

    expect(res.status).to.equal(200);
    expect(res.body.success).to.be.true;
    expect(res.body.data).to.be.an('array');
    expect(res.body.error).to.be.null;
  });

  /**
   * ❗ Caso extra: input vacío
   * La IA muchas veces NO cubre esto porque asume que siempre hay parámetro
   */
  it('should return error for empty input', async () => {
    const res = await request(app).get('/champions-league/teams/ ');

    expect(res.status).to.equal(400);
    expect(res.body.success).to.be.false;
    expect(res.body.data).to.be.null;
    expect(res.body.error).to.exist;
  });

  /**
   * ❗ Caso extra: null (simulado como ausencia de parámetro)
   * En Express no puedes pasar null directamente en params,
   * así que simulamos llamando a la ruta incompleta
   */
  it('should return error for null input', async () => {
    const res = await request(app).get('/champions-league/teams/');

    // Dependiendo de tu router, esto puede ser 404 o 400
    expect([400, 404]).to.include(res.status);
  });

  /**
   * 🔥 BONUS (muy recomendado en vida real)
   * Input inválido (fuera de A-H)
   */
  it('should return error for invalid groupId', async () => {
    const res = await request(app).get('/champions-league/teams/Z');

    expect(res.status).to.equal(400);
    expect(res.body.success).to.be.false;
    expect(res.body.data).to.be.null;
    expect(res.body.error).to.include('inválido');
  });

});
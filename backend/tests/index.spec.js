import axios from 'axios';

describe('Testing server', () => {
  it('Accessing root url should return 200', async () => {
    const res = await axios.get('http://127.0.0.1:5000');
    expect(res.status).toBe(200);
  });
});

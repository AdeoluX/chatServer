import app from './app';
const PORT = process.env.PORT || 4030;

app.listen(PORT, async () => {
  console.log(`Backend Listening on: ${PORT}`);
});
//
// app.listen(PORT, async () => {
//   await run_all();
//   console.log(`Fund Backend Listening on: ${PORT}`);
// });

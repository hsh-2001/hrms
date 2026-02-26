function generateFakeTransaction(id) {
  const now = new Date();
  const randomMinutes = Math.floor(Math.random() * 120);
  now.setMinutes(now.getMinutes() - randomMinutes);

  const amount = Math.floor(Math.random() * 80) + 20; // $20–$100

  return {
    id,
    datetime: now.toISOString().replace("T", " ").substring(0, 16),
    user: `Us*****${String(id).padStart(2, "0")}`,
    amount,
    type: "credit",
  };
}

function generateInitialData(count = 12) {
  return Array.from({ length: count }, (_, i) => generateFakeTransaction(i + 1))
    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
}

export { generateFakeTransaction, generateInitialData };

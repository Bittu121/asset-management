async function getData() {
  await new Promise((res) => setTimeout(res, 1000)); 
  return "data";
}

async  function AdminDashboard() {
  const data = await getData();
  return (
    <div>
      <h1 className="text-xl font-semibold">Dashboard{data}</h1>
    </div>
  );
}
export default AdminDashboard;

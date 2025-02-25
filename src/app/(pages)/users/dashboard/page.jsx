export default function Page() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <p className="text-4xl font-bold ">WelCum, DOST Staffs</p>
        <button className="bg-black py-2 px-4 rounded-md text-white">Submit Report</button>
      </div>
      <div className="border">
        <div className="p-4">
          <h1>Your Reports</h1>
        </div>
      </div>
    </div>
  )
}
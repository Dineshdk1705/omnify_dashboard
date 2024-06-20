import Table from "../components/Table";

const sampleData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  createdOn: new Date().toLocaleDateString(),
  username: `user${i + 1}`,
  status: i % 3 === 0 ? "Active" : i % 2 === 0 ? "Lead" : "Inactive",
  email: `user${i + 1}@example.com`,
  phoneNumber: `123-456-789${i}`,
  type: i % 3 === 0 ? "Admin" : "User",
}));

const headers = [
  { key: "createdOn", label: "Created On", img: "/assets/icons/calendar1.svg" },
  { key: "username", label: "Username", img: "/assets/icons/user.svg" },
  { key: "status", label: "Status", img: "/assets/icons/circle-dot.svg" },
  { key: "email", label: "Email", img: "/assets/icons/hash.svg" },
  {
    key: "phoneNumber",
    label: "Phone Number",
    img: "/assets/icons/hash.svg",
  },
  { key: "type", label: "Type", img: "/assets/icons/hash.svg" },
];
export default function Waitlist() {
  return (
    <>
      <h1 className="text-[20px] font-semibold mb-6">Waitlist</h1>
      <div className={`flex justify-between w-[90%] gap-2`}>
        <div className="border-[1px] border-gray-400 rounded-md w-[21rem] p-2">
          <p className="text-[12px] font-medium">
            All Waitlist<span className="text-gray-400 ml-2">100</span>
          </p>
        </div>
        <div className="border-[1px] border-gray-200 rounded-md w-[21rem] p-2">
          <p className="text-[12px] font-medium">
            Newly Added<span className="text-gray-400 ml-2">50</span>
          </p>
        </div>
        <div className="border-[1px] border-gray-200 rounded-md w-[21rem] p-2">
          <p className="text-[12px] font-medium">
            Leads<span className="text-gray-400 ml-2">20</span>
          </p>
        </div>
      </div>
      <Table data={sampleData} headers={headers} />
    </>
  );
}

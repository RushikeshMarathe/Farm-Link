function DashboardCard({ title, value, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-gray-600">
        {title}
      </h3>

      {/* 🔢 MAIN NUMBER */}
      <p className="text-3xl font-bold text-green-700 mt-2">
        {value}
      </p>

      {/* OPTIONAL DESCRIPTION */}
      {desc && (
        <p className="text-sm text-gray-500 mt-1">
          {desc}
        </p>
      )}
    </div>
  );
}

export default DashboardCard;

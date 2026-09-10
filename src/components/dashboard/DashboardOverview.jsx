export default function DashboardOverview() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-primary-black dark:text-primary-white">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Users",
            value: "1,234",
            color: "bg-primary-orange-strong",
          },
          {
            label: "Active Products",
            value: "56",
            color: "bg-primary-purple-strong",
          },
          { label: "Services", value: "12", color: "bg-primary-sage-strong" },
          {
            label: "Revenue",
            value: "$12.5K",
            color: "bg-primary-black-strong dark:bg-primary-white",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`${stat.color} rounded-lg p-6 text-primary-white dark:text-primary-black`}
          >
            <p className="text-sm font-medium opacity-80">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4 text-primary-black dark:text-primary-white">
          Recent Activity
        </h3>
        <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10">
          {[
            { user: "John Doe", action: "Created new product", time: "2 hours ago" },
            { user: "Jane Smith", action: "Updated pricing plan", time: "4 hours ago" },
            { user: "Mike Johnson", action: "Added new service", time: "6 hours ago" },
          ].map((activity, idx) => (
            <div
              key={idx}
              className="px-6 py-4 border-b border-primary-black/10 dark:border-primary-white/10 last:border-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary-black dark:text-primary-white">
                    {activity.user}
                  </p>
                  <p className="text-sm text-primary-black/80 dark:text-primary-white/80">
                    {activity.action}
                  </p>
                </div>
                <p className="text-sm text-primary-black/70 dark:text-primary-white/70">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

// a react component that uses shadcnui to create tabs
export const AppTabs = ({
  setActiveTab
}: {
  setActiveTab: (activeTab: string) => void
}): React.JSX.Element => {
  const tabs = ['Projects', 'Commands']

  return (
    <div className="flex w-full justify-center   py-2">
      <Tabs defaultValue={tabs[0]}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              className="text-sm font-normal"
              key={tab}
              value={tab}
              onClick={() => {
                console.log(tab)
                setActiveTab(tab)
              }}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

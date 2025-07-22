import { TitleBar } from './components/titlebar/titlebar'
import { ThemeProvider } from './components/context/theme-provider'
import { useState } from 'react'
import { ProjectsPage } from './components/projects-page/projects-page'
import { AppTabs } from './components/app-tabs'
import { ProjectsProvider } from './components/context/project-provide'

function App(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState('Projects')

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProjectsProvider>
        <div
          className={`h-dvh grid grid-rows-[min-content_min-content_1fr] w-full justify-stretch align-top `}
        >
          <div className="h-fit">
            <TitleBar></TitleBar>
          </div>
          <div className="">
            <AppTabs
              setActiveTab={(tab) => {
                setActiveTab(tab)
              }}
            ></AppTabs>
          </div>
          {activeTab === 'Projects' && <ProjectsPage></ProjectsPage>}
        </div>
      </ProjectsProvider>
    </ThemeProvider>
  )
}

export default App

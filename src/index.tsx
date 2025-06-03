import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import Entry from './components/Entry'
import EntryList from './EntryList'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <h1>Прогулка по старому Архангельску</h1>
      {EntryList.map((entry, i) => <Entry {...entry} key={i}/>)}
    </div>
  </StrictMode>,
)

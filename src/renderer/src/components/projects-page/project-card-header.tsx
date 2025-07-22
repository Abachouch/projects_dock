import { AppProjectType } from '../../../../types/project'
import { ProjectCardIcon } from './project-card-icon'
import brokenImage from '../../assets/broken-image.png'
export const ProjectCardHeader = ({
  name,
  type,
  icon,
  thumbnail
}: {
  name: string | undefined
  type: AppProjectType
  icon: string | undefined
  thumbnail: string | undefined
}): React.JSX.Element => {
  return (
    <header className="">
      {/* thumbnail */}
      {thumbnail && (
        <img
          src={thumbnail}
          onError={(s) => {
            s.currentTarget.src = brokenImage
          }}
          alt="thumbnails"
        />
      )}

      <div className="flex gap-4 py-2  ">
        <ProjectCardIcon icon={icon} name={name} type={type}></ProjectCardIcon>
        <div>
          <div className="text-xs  text-muted-foreground">
            {type === AppProjectType.UNKNOWN ? 'Folder' : type}{' '}
          </div>
          <span className="text-base font-medium w-full leading-loose"> {name}</span>
        </div>
      </div>
    </header>
  )
}

import {
	useMemo,
	useRef,
	useState,
} from 'react'
import {ArrowBack24px} from '../../assets/icons/ArrowBack24px'
import {ArrowForward24px} from '../../assets/icons/ArrowForward24px'
import {Fullscreen24px} from '../../assets/icons/Fullscreen24px'
import {Pause24px} from '../../assets/icons/Pause24px'
import {PlayArrow24px} from '../../assets/icons/PlayArrow24px'
import {Button} from '../../components/Button/Button'
import styles from './VideoPlayer.module.css'

const mockVideoLink = 'https://media.istockphoto.com/id/1937624337/video/young-cat-playing-with-a-mouse.mp4?s=mp4-640x640-is&k=20&c=tpy9XJIoqKXNwBS9CSFtVElf6UKlsKT_aMB1Gyrthxw='

function VideoPlayer() {
	const [paused, setPaused] = useState(true)

	const videoRef = useRef<HTMLVideoElement>(null)

	const handlePlay = () => {
		if (videoRef.current) {
			videoRef.current.play()
			setPaused(false)
		}
	}

	const handlePause = () => {
		if (videoRef.current) {
			videoRef.current.pause()
			setPaused(true)
		}
	}

	const handleRewind = () => {
		if (videoRef.current) {
			videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10)
		}
	}

	const handleForward = () => {
		if (videoRef.current) {
			videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10)
		}
	}

	const handleFullscreen = () => {
		if (videoRef.current) {
			videoRef.current.requestFullscreen()
		}
	}

	const buttonGroupStyles = useMemo(() => {
		const rect = videoRef.current?.getBoundingClientRect()
		return {
			position: 'absolute' as const,
			left: `${rect
				? rect.left + 10
				: 10}px`,
			bottom: `${rect
				? rect.bottom + 10
				: 10}px`,
		}
	}, [])

	const fullScreenButtonStyles = useMemo(() => {
		const rect = videoRef.current?.getBoundingClientRect()
		return {
			position: 'absolute' as const,
			right: `${rect
				? rect.right + 10
				: 10}px`,
			bottom: `${rect
				? rect.bottom + 10
				: 10}px`,
		}
	}, [])

	return (
		<div className={styles.layout}>
			<div className={styles.videoContainer}>
				<video
					ref={videoRef}
					className={styles.video}
					src={mockVideoLink}
					controls={false}
					style={{
						width: '100%',
						height: '100%',
					}}
				/>
				<div
					style={buttonGroupStyles}
					className={styles.buttonGroup}
				>
					<Button
						type="icon"
						icon={PlayArrow24px}
						state={paused
							? 'default'
							: 'disabled'}
						onClick={handlePlay}
					/>
					<Button
						type="icon"
						icon={Pause24px}
						state={paused
							? 'disabled'
							: 'default'}
						onClick={handlePause}
					/>
					<Button
						type="icon"
						icon={ArrowBack24px}
						onClick={handleRewind}
					/>
					<Button
						type="icon"
						icon={ArrowForward24px}
						onClick={handleForward}
					/>
				</div>
				<Button
					type="icon"
					icon={Fullscreen24px}
					onClick={handleFullscreen}
					style={fullScreenButtonStyles}
				/>
			</div>
		</div>
	)
}

export {
	VideoPlayer,
}

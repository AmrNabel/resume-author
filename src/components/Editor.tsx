import {
  Box,
  Button,
  Typography,
  Autocomplete,
  TextField,
  LinearProgress,
  linearProgressClasses,
  styled,
  IconButton
} from '@mui/material'
import LeftSidebar, { leftSections } from './ResumeEditor/LeftSidebar'
import RightSidebar from './ResumeEditor/RightSidebar'
import Section from './ResumeEditor/Section'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useEffect, useState } from 'react'
import { SVGEditName } from '../assets/svgs'

const nonVisibleSections = [
  ...leftSections,
  'id',
  'lastUpdated',
  'version',
  'error',
  'status',
  'isDirty'
]

const ButtonStyles = {
  border: '2px solid #3A35A2',
  borderRadius: '100px',
  textTransform: 'none',
  fontWeight: 600,
  color: '#3A35A2',
  p: '0 25px'
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '15px',
  borderRadius: '0px 30px 30px 0px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#E1E2F6',
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800]
    })
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#614BC4',
    ...theme.applyStyles('dark', {
      backgroundColor: '#614BC4'
    })
  }
}))

const ResumeEditor = () => {
  const [addSectionOpen, setAddSectionOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [sectionOrder, setSectionOrder] = useState<(keyof Resume)[]>([
    'summary',
    'experience',
    'education'
  ])

  const resume = useSelector((state: RootState) => state.resume.resume)
  useEffect(() => {
    console.log('🚀 ~ resume', resume)
  }, [resume])

  const AllSections = Object.keys(resume as Resume).filter(
    sec =>
      !sectionOrder.includes(sec as keyof Resume) && !nonVisibleSections.includes(sec)
  )

  const handleSectionSelect = (event: any, value: string | null) => {
    setSelectedSection(value)
  }

  const handleAddSelectedSection = () => {
    if (selectedSection && AllSections.includes(selectedSection)) {
      setSectionOrder(prev => [...prev, selectedSection as keyof Resume])
      setSelectedSection(null) // Reset selection
    }
    setAddSectionOpen(false)
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: '30px'
        }}
      >
        <Box sx={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography
              sx={{
                color: '#000',
                fontFamily: 'Poppins',
                fontSize: '42px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '55.88px'
              }}
            >
              Alice Parker Resume
            </Typography>
            <IconButton>
              <SVGEditName />
            </IconButton>
          </Box>
          <Typography
            sx={{
              color: '#2E2E48',
              fontFamily: 'DM Sans',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              letterSpacing: '0.16px'
            }}
          >
            Placeholder for instructional text, if needed, TBD
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Button variant='outlined' sx={ButtonStyles}>
            Preview
          </Button>
          <Button variant='outlined' sx={ButtonStyles}>
            Save as Draft
          </Button>
          <Button
            variant='outlined'
            sx={{ ...ButtonStyles, color: 'white', bgcolor: '#614BC4' }}
          >
            Save and Sign
          </Button>
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            sx={{
              color: '#2E2E48',
              fontFamily: 'DM Sans',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
              letterSpacing: '0.16px',
              mt: 2
            }}
          >
            Progress: 50%
          </Typography>
          <Typography
            sx={{
              color: '#2E2E48',
              fontFamily: 'DM Sans',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              letterSpacing: '0.16px',
              mt: 2,
              pr: 2
            }}
          >
            Add at least 1 credential!{' '}
          </Typography>
        </Box>

        <BorderLinearProgress variant='determinate' value={50} />
      </Box>
      <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
        <LeftSidebar />

        {/* Main Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1
          }}
        >
          <Box>
            {resume && sectionOrder.map(key => <Section key={key} sectionId={key} />)}
          </Box>

          {/* Autocomplete for Adding New Sections */}
          {addSectionOpen && (
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}
            >
              <Autocomplete
                options={AllSections}
                value={selectedSection}
                onChange={handleSectionSelect}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Add Section'
                    placeholder='Type to search...'
                    variant='outlined'
                    fullWidth
                  />
                )}
                fullWidth
              />
              <Button
                onClick={handleAddSelectedSection}
                disabled={!selectedSection}
                sx={{ borderRadius: 5 }}
              >
                Add
              </Button>
            </Box>
          )}
        </Box>

        <RightSidebar />
      </Box>
    </Box>
  )
}

export default ResumeEditor

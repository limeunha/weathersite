import './css/Banner.css'
import TextField from '@mui/material/TextField'
import CheckIcon from '@mui/icons-material/Check'
import ToggleButton from '@mui/material/ToggleButton'

function Banner() {
   return (
      <div
         style={{
            width: '250%',
            height: '400px',
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)),url(/images/sky.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
         }}
      >
         <div className="banner">
            <h1 className="banner_msg">환영합니다~ 날씨를 검색해주세요!</h1>
            <form className="banner_form">
               <TextField sx={{ backgroundColor: 'white' }} id="fullwith" fullWidth label="지역을 입력해주세요" variant="outlined" />
               <ToggleButton sx={{ width: 100, height: 56, backgroundColor: 'white', color: 'rgb(0, 102, 255)' }} value="check">
                  검색
                  <CheckIcon />
               </ToggleButton>
            </form>
         </div>
      </div>
   )
}

export default Banner

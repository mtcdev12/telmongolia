import React from 'react'

function Help6() {
  return (
    <div>
        <h4>Гэрээ хийхэд бүрдүүлэх материал /цуцлах/</h4>
        <div>
          <strong>Алба</strong>:70008000 дугаарт захиалга өгөх, ААН-н гэрчилгээ , Тамга , Захирлын иргэний цахим үнэмлэх, Түрээсийн байранд бол түрээсийн гэрээ болон тухайн байгууллагын зөвшөөрөл.
        </div>
        <div>
          <strong>Хувь хэрэглэгч</strong>: 70008000 дугаарт захиалга өгөх, иргэний үнэмлэх /Үнэмлэхний хаяг захиалга өгсөн хаягтай таарч байх/
        </div>
        <hr></hr>
        <h4>Гэрээ цуцлах</h4>
     
        <table className='table'>
          <tbody>
            <tr>
              <td>Утас</td>
              <td>
                <div>
                  <strong>Хувь:</strong>
                  <ul style={{marginLeft: 50}}>
                    <li>Гэрээний дэвтэр</li>
                    <li>Иргэний үнэмлэх</li>
                    <li>Биллээс гарсан төлбөр төлөх  / Гэрээ цуцлах хүртэлх өдрийн билл уншигдана /</li>
                  </ul>
                </div>
                <div>
                  <strong>Алба:</strong>
                  <ul style={{marginLeft: 50}}>
                    <li>Гэрээний дэвтэр</li>
                    <li>Албан бичиг</li>
                    <li>Биллээс гарсан төлбөр төлөх  / Гэрээ цуцлах хүртэлх өдрийн билл уншигдана /</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>Интернэт</td>
              <td>
                <div>
                  <strong>Хувь:</strong>
                  <ul style={{marginLeft: 50}}>
                    <li>Бичиг баримттайгаа салбарт хандах</li>
                  </ul>
                </div>
                <div>
                  <strong>Алба:</strong>
                  <ul style={{marginLeft: 50}}>
                    <li>Албан хүсэлттэй салбарт хандах</li>
                  </ul>
                </div>
                <div>
                Тайлбар: Интернэтийн гэрээ цуцлахад хугацаа дуссаагүй бол өргөдөл 
                бичиж өгөөд мөнгөө буцааж авах аль эсвэл суурин утасны төлбөр лүү шилжүүлэх боломжтой 
                </div>
              </td>
            </tr>
            <tr>
              <td>КаТВ</td>
              <td>
                <div>
                  <strong>Хувь:</strong>
                  <ul style={{marginLeft: 50}}>
                    <li>Бичиг баримттайгаа салбарт хандах</li>
                  </ul>
                </div>
                <div>
                  <strong>Алба:</strong>
                  <ul style={{marginLeft: 50}}>
                    <li>Албан хүсэлттэй салбарт хандах</li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default Help6
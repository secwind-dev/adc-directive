# Welcome application adc-directive!

adc-directive คือ service control ที่ช่วยแก้ปัญในเรื่อง code ต่างๆที่มีความยุ่งยากซับซ้อน ช่วยให้ทีมเขียน code ไปในทางเดียวกัน service ที่สร้างเพื่อแก้ปัญหาต่างๆ ผ่านประสบการณ์การทำงานของผู้สร้างมากกว่า 10ปี

# ✨จุดเด่น

-   มี service มากมายใช้ง่ายเข้าใจได้ง่าย สะดวกกับการทำงานเป็นทีม
-   ใช้ได้ร่วมกับทุก framework JS,TS,(React,Vue,Angular ฯลฯ),PHP Laravel
-   baseเป็น js pureใช้ง่ายและไม่ติด dependencies ใดๆสามารถช้ได้ไปตลอด
-   service ทุกตัสผ่านการ testing จึงทำให้มั่นใจได้ว่าไม่มีบัคและปลอดภัย

## Installation

[Link](https://www.npmjs.com/package/adc-directive) adc-directive
[Link](https://www.npmjs.com/package/adc-calendar) adc-calendar (recommend)

```sh
npm  npm  i  adc-directive
```

## Code Example

```sh
import  *  as  dc  from  'adc-directive'
const  text  =  dc.toCombineText(['a','b',null,'c'],'_')
text  =  'a_b_c'
```

## Function

ชื่อที่นำหน้าแต่ละ function

> dc.to

-   สื่อถึง fn ที่มีการ return ค่าและค่านั้นจะเป็น value type เดียวเสมอเพื่อสอดคล้องกับการใช้งานในรูปแบบ functional programming
    > dc.validate
-   fn ที่ทำการเช็คสิ่งต่างๆ แต่จะเข้มข้นกว่า

         1 = ผ่านเสมอ  0 = ไม่ผ่านเสอ  -1 = เกิดความผิดพลาดเสมอ
         เราจึงใช้ประโยชน์จาก status เพื่อ if กรณีหยุดการทำงานหรือพ่น new throw Error 		  message ออกไป
         return {
             status: 1 | 0 | -1 ,
             message: text
         }

> dc.run

-   fn loop process เป็น fn ที่ไม่มีการ return อะไรกลับมา

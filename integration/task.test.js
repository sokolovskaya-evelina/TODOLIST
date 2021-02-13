describe('task',()=>{
    it('base task example, visually looks correct', async ()=>{
        await page.goto('http://localhost:6006/iframe.html?id=todolist-task--task-example&viewMode=story')
        const image = await page.screenshot()

        expect(image).toMatchImageSnapshot()
    })
})
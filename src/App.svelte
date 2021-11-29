<script lang="ts">
    import Box from "./Box.svelte";
    import SvelteTable from "svelte-table";
    import {onMount} from "svelte";

    let rows = [];

    let schools = [];
    let courses = [];
    let selectedSchool;
    let selectedCourse;

    async function getSchools(): Promise<Array<String>> {
        const response = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: "query GetSchools {querySchool(order: {desc: name}) {name}}",
                })
            }
        );

        const json = await response.json();
        const schools = json.data.querySchool;
        const schoolArr = []
        for (let i in schools) {
            schools[i].id = i
            schoolArr[i] = schools[i]
        }
        return schoolArr
    }

    async function fetchRatings(school: string, courseCode: string) {
        const response = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: "query QuerySchool($school: String, $code: String){\n" +
                        "  querySchool (filter: {name: {allofterms: $school}}) {\n" +
                        "    name\n" +
                        "    courses (filter: {code:{eq: $code}}) {\n" +
                        "      professors (first:10, order: {desc: rating}) {\n" +
                        "        name\n" +
                        "        rating\n" +
                        "        totalRatings\n" +
                        "      }\n" +
                        "    }\n" +
                        "  }\n" +
                        "}",
                    variables: {
                        "school": school,
                        "code": courseCode,
                    }
                })
            }
        );
        const json = await response.json();
        console.log(json)
        const querySchool = json.data.querySchool;
        const professors = querySchool[0].courses[0].professors;
        rows = []
        for (let i in professors) {
            const professor = professors[i];
            if (professor.totalRatings == 0) {
                professor.rating = 0.00
            } else {
                professor.rating = (professor.rating / professor.totalRatings).toFixed(2)
            }
            console.log(professor)
            rows[i] = professor
        }
    }

    async function fetchCourses() {
        const response = await fetch('http://localhost:8080/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: "query GetCourses($school: String) {\n" +
                        "            querySchool(filter:{name: {allofterms: $school}}, order: {desc: name}) {\n" +
                        "                courses (order: {asc: code}){\n" +
                        "                    code\n" +
                        "                }\n" +
                        "            }\n" +
                        "        }",
                    variables: {
                        "school": selectedSchool.name,
                    }
                })
            }
        );

        const promise = await response.json();
        const courseData = promise.data.querySchool[0].courses;
        for (let i in courseData) {
            courseData[i].id = i
            courses[i] = courseData[i]
        }
    }

    let ratings;

    function handleLookup() {
        ratings = fetchRatings("Valencia College", "ENC1101");
    }

    const columns = [
        {
            key: "name",
            title: "Professor",
            value: v => v.name,
            sortable: false,
        },
        {
            key: "rating",
            title: "Rating",
            value: v => v.rating,
            sortable: false,
        },
        {
            key: "totalRatings",
            title: "Total Ratings",
            value: v => v.totalRatings,
            sortable: false,
        },
    ];


    onMount(async () => {
        schools = await getSchools()
    })

</script>

<main>
    <div class="center">
        <Box>
            <h1>Find My Professors</h1>
            <hr>
            <select bind:value={selectedSchool}
                    on:change="{() =>{ console.log(selectedSchool); fetchCourses(); return selectedSchool; }}">
                {#each schools as school}
                    <option value={school}>
                        {school.name}
                    </option>
                {/each}
            </select>
            <select bind:value={selectedCourse}
                    on:change="{() =>{ console.log(selectedCourse);  return selectedCourse; }}">
                {#each courses as course}
                    <option value={course}>
                        {course.code}
                    </option>
                {/each}
            </select>


            <button on:click={handleLookup}>Lookup</button>
            <SvelteTable columns="{columns}" rows="{rows}"/>
        </Box>
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }




    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
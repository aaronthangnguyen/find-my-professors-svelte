<script lang="ts">
    import Box from "./Box.svelte";
    // noinspection TypeScriptCheckImport
    import SvelteTable from "svelte-table";
    import {onMount} from "svelte";

    let rows = [];

    let schools = [];
    let courses = [];
    let selectedSchool;
    let selectedCourse;

    // noinspection TypeScriptUnresolvedVariable
    const backendAddress = "https://findmyprofessors.warrensnipes.dev/graphql"

    async function getSchools(): Promise<Array<String>> {
        const response = await fetch(backendAddress, {
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

    async function fetchRatings(school: String, courseCode: String) {
        const response = await fetch(backendAddress, {
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
                        "      professors (first:30, order: {desc: rating}) {\n" +
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
        const querySchool = json.data.querySchool;
        const professors = querySchool[0].courses[0].professors;
        rows = []
        for (let i in professors) {
            rows[i] = professors[i]
        }
    }

    async function fetchCourses(school: String) {
        const response = await fetch(backendAddress, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    //TODO: Figure out how to handle pagination
                    query: `query GetCourses($school: String) {
                                    querySchool(filter:{name: {allofterms: $school}}) {
                                        courses (order: {asc: code}, first: 10000){
                                            code
                                        }
                                    }
                                }`,
                    variables: {
                        "school": school,
                    }
                })
            }
        );

        const promise = await response.json();
        const courseData = promise.data.querySchool[0].courses;
        courses = []
        for (let i in courseData) {
            courseData[i].id = i
            courses[i] = courseData[i]
        }
    }

    let ratings;

    function handleLookup() {
        ratings = fetchRatings(selectedSchool.name, selectedCourse.code);
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
            sortable: true,
        },
        {
            key: "totalRatings",
            title: "Total Ratings",
            value: v => v.totalRatings,
            sortable: true,
        },
    ];


    onMount(async () => {
        schools = await getSchools()
    })

</script>

<main>
    <div>
        <Box>
            <h1>Find My Professors</h1>
            <hr>
            <select bind:value={selectedSchool}
                    on:change={() =>{ fetchCourses(selectedSchool.name); return selectedSchool; }}>
                {#each schools as school}
                    <option value={school}>
                        {school.name}
                    </option>
                {/each}
            </select>
            <select bind:value={selectedCourse} on:change={() => selectedCourse}>
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
        margin: 0 auto;
        max-width: none;
    }

    select {
        min-width: 7.5%;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 6vw;
        font-weight: 100;
    }
</style>
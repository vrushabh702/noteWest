function About() {
    return (
        <div>
        <section className="about_style11 p-0" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-12 col-sm-12 res_mrg verticle-center">
                        <div className="about_text wow fadeInLeft animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                            <span>Overview</span>
                            <h2>About NoteNest</h2>
                            <p>NoteNest is a note generating platform, designed by and for counselors, psychologists, social workers, and other mental health professionals.<br /><br />NoteNest was created to change the way professionals keep notes, dramatically reducing the time it takes for documentation.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 verticle-center">
                        <div className="about_imgr wow fadeInDown animated" data-wow-delay="500ms" data-wow-duration="1500ms">
                            <img src="assets/media/img/image-01.jpg" className="fullwidth" alt="lady in yoga position"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*begin::Curve bottom*/}
        <div className="landing-curve landing-dark-color mb-5 mb-lg-20">
        </div>
        {/*end::Curve bottom*/}
        </div>
    )
}

export default About
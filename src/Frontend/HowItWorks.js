function HowItWorks() {
    return (
        <div className="mb-n10 mb-lg-n20 z-index-2">
            {/*begin::Container*/}
            <div className="container">
                {/*begin::Heading*/}
                <div className="text-center mb-17">
                    {/*begin::Title*/}
                    <h3 className="fs-2hx text-dark mb-5" id="how-it-works" data-kt-scroll-offset="{default: 100, lg: 150}">How does it work? </h3>
                    {/*end::Title*/}
                    {/*begin::Text*/}
                    <div className="fs-5 text-muted">Once you have an account, creating documentation is as easy as 3 steps...</div>
                    {/*end::Text*/}
                </div>
                {/*end::Heading*/}
                {/*begin::Row*/}
                <div className="row w-100 gy-10 mb-md-20 howItWork">
                    {/*begin::Col*/}
                    <div className="col-md-4 px-5 wow fadeInLeft animated">
                        {/*begin::Story*/}
                        <div className="text-center mb-10 mb-md-0">
                            {/*begin::Illustration*/}
                            <img src="assets/media/img/image-03.jpg" className="mb-9" alt="Add Client" />
                            {/*end::Illustration*/}
                            {/*begin::Heading*/}
                            <div className="d-flex flex-center mb-5">
                                {/*begin::Badge*/}
                                <span className="badge badge-circle badge-light-success fw-bolder p-5 me-3 fs-3">1</span>
                                {/*end::Badge*/}
                                {/*begin::Title*/}
                                <div className="fs-5 fs-lg-3 fw-bolder text-dark">Add Client</div>
                                {/*end::Title*/}
                            </div>
                            {/*end::Heading*/}
                            {/*begin::Description*/}
                            <div className="fs-6 fs-lg-4 text-muted">Input some basic client information
                                like preferred name, gender, and DOB and select that client.</div>
                            {/*end::Description*/}
                        </div>
                        {/*end::Story*/}
                    </div>
                    {/*end::Col*/}
                    {/*begin::Col*/}
                    <div className="col-md-4 px-5 wow fadeInDown animated">
                        {/*begin::Story*/}
                        <div className="text-center mb-10 mb-md-0">
                            {/*begin::Illustration*/}
                            <img src="assets/media/img/image-04.jpg" className="mb-9" alt="Select Keywords" />
                            {/*end::Illustration*/}
                            {/*begin::Heading*/}
                            <div className="d-flex flex-center mb-5">
                                {/*begin::Badge*/}
                                <span className="badge badge-circle badge-light-success fw-bolder p-5 me-3 fs-3">2</span>
                                {/*end::Badge*/}
                                {/*begin::Title*/}
                                <div className="fs-5 fs-lg-3 fw-bolder text-dark">Select Keywords</div>
                                {/*end::Title*/}
                            </div>
                            {/*end::Heading*/}
                            {/*begin::Description*/}
                            <div className="fs-6 fs-lg-4 text-muted">Select the type of document you would like
                                to create and start clicking keywords. As you click, watch the document write itself in seconds.</div>
                            {/*end::Description*/}
                        </div>
                        {/*end::Story*/}
                    </div>
                    {/*end::Col*/}
                    {/*begin::Col*/}
                    <div className="col-md-4 px-5 wow fadeInRight animated">
                        {/*begin::Story*/}
                        <div className="text-center mb-10 mb-md-0">
                            {/*begin::Illustration*/}
                            <img src="assets/media/img/image-05.jpg" className="mb-9" alt="Review Your Document" />
                            {/*end::Illustration*/}
                            {/*begin::Heading*/}
                            <div className="d-flex flex-center mb-5">
                                {/*begin::Badge*/}
                                <span className="badge badge-circle badge-light-success fw-bolder p-5 me-3 fs-3">3</span>
                                {/*end::Badge*/}
                                {/*begin::Title*/}
                                <div className="fs-5 fs-lg-3 fw-bolder text-dark">Review Your Document</div>
                                {/*end::Title*/}
                            </div>
                            {/*end::Heading*/}
                            {/*begin::Description*/}
                            <div className="fs-6 fs-lg-4 text-muted">Read over the document and make any desired changes or additions, save it to the system, and you are done!</div>
                            {/*end::Description*/}
                        </div>
                        {/*end::Story*/}
                    </div>
                    {/*end::Col*/}
                </div>
                {/*end::Row*/}
                {/*begin::Product slider*/}
                <div className="tns tns-default">
                <iframe width="100%" height="500px" src="https://www.youtube.com/embed/eV_LYB0-Gp0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    {/*begin::Slider*/}
                </div>
                {/*end::Product slider*/}
            </div>
            {/*end::Container*/}
        </div>
    )
}

export default HowItWorks
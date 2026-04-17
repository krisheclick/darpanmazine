"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Modal, Button } from "react-bootstrap";
import NominateForm from "@/components/awards/NominateForm";
import DangerHTML from "@/components/common/DangerHTML";
import { useAwardContext } from "@/context/award_context";

interface UpcomingNominations {
  id: number;
  heading: string;
  permalink: string;
  thumb_image: string;
  award_year: string;
  nomination_start_date: string;
  nomination_end_date: string;
  category: string;
}

interface AwardDetails {
  id: number;
  heading: string;
  permalink: string;
  author: string;
  award_year: string;
  nomination_open: string;
  category: string;
  description: string;
  short_description: string;
  publish_date: string;
  read_counter: number;
  is_featured: string;
  status: string;
  highlight_title: string;
  video: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  videos: { id: number; title: string; link: string }[];
  images: { file_id: number; file_url: string }[];
  photos: { file_id: number; file_url: string; file_thumb_url: string }[];
  sponsors: { name: string; logo: string }[];
  winners: any[];
  upcoming_nominations: UpcomingNominations | null;
}

interface ApiResponse {
  response_code: boolean;
  response_message: string;
  response_data: AwardDetails;
}

export default function AwardDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [awardData, setAwardData] = useState<AwardDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNominateModal, setShowNominateModal] = useState(false);
  const { setCategory } = useAwardContext();

  useEffect(() => {
    const fetchAwardDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/award/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch award details');
        }
        const data: ApiResponse = await response.json();
        if (data.response_code) {
          setAwardData(data.response_data);
          setCategory(data.response_data.upcoming_nominations!.category);
        } else {
          setError(data.response_message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchAwardDetails();
    }
  }, [slug]);

  if (loading) {
    return <div className="container py-5">Loading...</div>;
  }

  if (error) {
    return <div className="container py-5">Error: {error}</div>;
  }

  if (!awardData) {
    return <div className="container py-5">Award not found</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">{awardData.heading}</h1>
          <div className="mb-3">
            <small className="text-muted">
              By {awardData.author} | Published on {new Date(awardData.publish_date).toLocaleDateString()}
            </small>
          </div>

          {awardData.short_description && (
            <div className="mb-4">
              <DangerHTML html={awardData.short_description} />
            </div>
          )}

          {awardData.video && (
            <div className="mb-4">
              <iframe
                width="100%"
                height="315"
                src={awardData.video}
                title="Award Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {awardData.description && (
            <div className="mb-4">
              <DangerHTML html={awardData.description} />
            </div>
          )}

          {awardData.upcoming_nominations && (
            <div className="mb-4">
              <Button
                variant="primary"
                onClick={() => setShowNominateModal(true)}
              >
                Nominate for {awardData.upcoming_nominations.award_year} Awards
              </Button>
            </div>
          )}

          {/* Additional sections for photos, sponsors, etc. can be added here */}
        </div>
      </div>

      <Modal
        show={showNominateModal}
        onHide={() => setShowNominateModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{awardData.upcoming_nominations?.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NominateForm slug={[awardData.upcoming_nominations!.permalink]} />
        </Modal.Body>
      </Modal>
    </div>
  );
}